import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const AuthContext = createContext(null);

const EXPIRATION_TIME = 30 * 60 * 1000;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedData = localStorage.getItem('user_session');
      if (!storedData) return null;
      const { user: savedUser, expiresAt } = JSON.parse(storedData);
      if (Date.now() > expiresAt) {
        localStorage.removeItem('user_session');
        return null;
      }
      return savedUser;
    } catch (error) {
      console.error('Error al analizar la sesión:', error);
      localStorage.removeItem('user_session');
      return null;
    }
  });

  const [passwordOverrides, setPasswordOverrides] = useState(() => {
    try {
      const overrides = localStorage.getItem('passwords_override');
      return overrides ? JSON.parse(overrides) : {};
    } catch {
      return {};
    }
  });

  const ultimoUsuarioRef = useRef(null);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user_session');
  }, []);

  const login = useCallback((datos) => {
    console.log("¡Login exitoso! Guardando sesión para:", datos);
    
    // 1. Guardamos los datos en el estado y en el localStorage
    setUser(datos);
    ultimoUsuarioRef.current = datos;
    const sessionData = {
      user: datos,
      expiresAt: Date.now() + EXPIRATION_TIME,
    };
    localStorage.setItem('user_session', JSON.stringify(sessionData));

    // 2. SOLUCIÓN: Forzamos la recarga de la página para evitar el conflicto con el Swal
    // Usamos un pequeñísimo delay para que el Swal alcance a mostrarse
    setTimeout(() => {
      window.location.href = '/';
    }, 150);
    
  }, []);

  const actualizarContrasena = useCallback((email, nuevaContrasena) => {
    if (!email) return;
    const emailLower = String(email).toLowerCase();

    setPasswordOverrides((prev) => {
      const updated = { ...prev, [emailLower]: nuevaContrasena };
      localStorage.setItem('passwords_override', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const manejarExpiracion = useCallback(() => {
    const storedData = localStorage.getItem('user_session');
    let usuarioActual = user;

    if (storedData) {
      try {
        usuarioActual = JSON.parse(storedData).user;
      } catch (e) {
        console.error('Error al leer sesión previa:', e);
      }
    }

    const usuarioARecuperar = usuarioActual || ultimoUsuarioRef.current;
    if (!usuarioARecuperar) return;

    ultimoUsuarioRef.current = usuarioARecuperar;
    logout();

    Swal.fire({
      icon: 'warning',
      title: 'Sesión inactiva',
      text: 'Tu sesión ha expirado por inactividad. ¿Deseás mantener la sesión iniciada o ingresar nuevamente?',
      showCancelButton: true,
      confirmButtonColor: '#326f7a',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Mantener sesión',
      cancelButtonText: 'Iniciar sesión de nuevo',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed && ultimoUsuarioRef.current) {
        login(ultimoUsuarioRef.current);
        Swal.fire({
          icon: 'success',
          title: 'Sesión restaurada',
          text: 'Bienvenido nuevamente.',
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        ultimoUsuarioRef.current = null;
      }
    });
  }, [user, logout, login]);

  const resetTimer = useCallback(() => {
    if (!user) return;
    const storedData = localStorage.getItem('user_session');
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        parsed.expiresAt = Date.now() + EXPIRATION_TIME;
        localStorage.setItem('user_session', JSON.stringify(parsed));
      } catch (error) {
        console.error('Error al actualizar tiempo de expiración:', error);
      }
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    ultimoUsuarioRef.current = user;

    const interval = setInterval(() => {
      const storedData = localStorage.getItem('user_session');
      if (storedData) {
        const { expiresAt } = JSON.parse(storedData);
        if (Date.now() > expiresAt) {
          clearInterval(interval);
          manejarExpiracion();
        }
      } else {
        clearInterval(interval);
        logout();
      }
    }, 5000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const storedData = localStorage.getItem('user_session');
        if (storedData) {
          try {
            const { expiresAt } = JSON.parse(storedData);
            if (Date.now() > expiresAt) {
              clearInterval(interval);
              manejarExpiracion();
            }
          } catch (e) {
            logout();
          }
        } else {
          logout();
        }
      }
    };

    const eventos = ['mousemove', 'keydown', 'click', 'scroll'];
    const handleUserActivity = () => resetTimer();

    eventos.forEach((evento) => window.addEventListener(evento, handleUserActivity));
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      eventos.forEach((evento) => window.removeEventListener(evento, handleUserActivity));
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user, logout, resetTimer, manejarExpiracion]);

  return (
    <AuthContext.Provider value={{ user, login, logout, passwordOverrides, actualizarContrasena }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = { 
  children: PropTypes.node.isRequired 
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};