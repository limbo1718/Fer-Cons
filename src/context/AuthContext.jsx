import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const AuthContext = createContext(null);

// Tiempo de expiración para la prueba (1 minuto)
// Para pasar a producción, usar: 30 * 60 * 1000
const EXPIRATION_TIME = 1 * 60 * 1000;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedData = localStorage.getItem('user_session');
      if (!storedData) return null;

      const { user: savedUser, expiresAt } = JSON.parse(storedData);

      // Si el tiempo actual superó la expiración al arrancar la app
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

  // Referencia para mantener temporalmente al usuario al forzar el Login de fondo
  const ultimoUsuarioRef = useRef(null);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user_session');
  }, []);

  const login = useCallback((datos) => {
    setUser(datos);
    ultimoUsuarioRef.current = datos;
    const sessionData = {
      user: datos,
      expiresAt: Date.now() + EXPIRATION_TIME,
    };
    localStorage.setItem('user_session', JSON.stringify(sessionData));
  }, []);

  // Manejo de la expiración: manda al login de fondo inmediatamente y muestra el cartel
  const manejarExpiracion = useCallback(() => {
    // 1. Capturamos y guardamos la referencia del usuario antes de desmontar
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

    // 2. Cerramos sesión al instante para enviar al usuario al Login de fondo (frena peticiones al servidor)
    logout();

    // 3. Mostramos la alerta flotando sobre la pantalla de Login
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
        // Opción A: Restaura la sesión y lo devuelve automáticamente al inicio
        login(ultimoUsuarioRef.current);
        Swal.fire({
          icon: 'success',
          title: 'Sesión restaurada',
          text: 'Bienvenido nuevamente.',
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        // Opción B: Se queda en la página de Login descartando los datos previos
        ultimoUsuarioRef.current = null;
      }
    });
  }, [user, logout, login]);

  // Renueva la marca de tiempo si el usuario realiza alguna interacción
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

    // Mantenemos sincronizada la referencia del usuario activo
    ultimoUsuarioRef.current = user;

    // Control de inactividad eficiente: verifica cada 5 segundos sin saturar el servidor
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

    // Detección cuando el usuario cambia de pestaña/ventana y regresa a la app
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
    <AuthContext.Provider value={{ user, login, logout }}>
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