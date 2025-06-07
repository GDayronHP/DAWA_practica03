export const USER_ROLES = {
  ADMIN: 'admin',
  MODERADOR: 'moderador',
  USUARIO: 'usuario'
};

export const hasPermission = (userRole, action, resource) => {
  const permissions = {
    admin: {
      laboratorio: ['create', 'read', 'update', 'delete'],
      ordencompra: ['create', 'read', 'update', 'delete']
    },
    moderador: {
      laboratorio: ['read', 'update'],
      ordencompra: ['read', 'update']
    },
    usuario: {
      laboratorio: ['read'],
      ordencompra: ['read']
    }
  };

  return permissions[userRole]?.[resource]?.includes(action) || false;
};

export const canCreate = (userRole, resource) => 
  hasPermission(userRole, 'create', resource);

export const canUpdate = (userRole, resource) => 
  hasPermission(userRole, 'update', resource);

export const canDelete = (userRole, resource) => 
  hasPermission(userRole, 'delete', resource);

export const canRead = (userRole, resource) => 
  hasPermission(userRole, 'read', resource);