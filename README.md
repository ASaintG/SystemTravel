# Sistema de Viajes

## Descripción del Proyecto

El **Sistema de Viajes** es una aplicación que automatiza el registro y gestión de viajes de colaboradores a sus hogares, utilizando servicios de transporte contratados. Este sistema gestiona tanto el backend, desarrollado en .NET con el framework 8, como el frontend, desarrollado en React con Chakra UI.

## Situación Actual

El proceso actual de transporte de colaboradores se lleva a cabo manualmente, lo que resulta en errores y demoras al calcular los pagos a los transportistas. El Sistema de Viajes busca simplificar y automatizar este proceso.

## Requisitos Generales del Cliente

- Automatizar el registro de cada viaje de los colaboradores con transportistas.
- Permitir la gestión de sucursales asignadas a los colaboradores.
- Calcular automáticamente los montos a pagar a cada transportista.

## Requisitos Funcionales

1. **Login**
   - Crear una pantalla de login para identificar al usuario antes de usar el sistema.

2. **Administración de Sucursales**
   - Permitir asignar sucursales a colaboradores.
     - Seleccionar colaborador y sucursal.
     - Registrar la distancia (en kilómetros) de la sucursal a la casa del colaborador.
     - Un colaborador puede tener varias sucursales, pero no la misma más de una vez.
     - La distancia debe ser mayor a 0 y menor o igual a 50 km.

3. **Registro de Viajes**
   - Formulario para registrar viajes.
     - Solo usuarios con perfil “Gerente de tienda” pueden registrar viajes.
     - Registrar el usuario que realiza el registro.
     - Seleccionar sucursal y mostrar colaboradores asignados.
     - Seleccionar colaboradores que viajarán.
     - Seleccionar el transportista.
     - La tarifa del transportista y la distancia no son modificables en este formulario.
     - Un viaje no puede superar 100 km en total.
     - Un colaborador puede viajar solo una vez al día.

4. **Reportes de Viajes**
   - Generar un reporte de viajes realizados por transportista.
     - Filtrar por rango de fechas y transportista.
     - Mostrar detalle de todos los viajes.
     - Calcular total a pagar por los viajes en el rango seleccionado.

## Tecnologías Utilizadas

- **Backend**: 
  - .NET 8
  - Swagger para la documentación de la API.
- **Datos**:
  - MySql
- **Frontend**: 
  - React
  - Chakra UI (v2.10.3)
  - Axios para realizar solicitudes HTTP.

## Instalación

### Backend (.NET)

1. Clona el repositorio:
   ```bash
   git clone https://github.com/ASaintG/SystemTravel/tree/main/Backend/systemTravelBackend
2. Restaura las dependencias:
   ```
   dotnet restore
3. Ejecuta la aplicación:
   ```
   dotnet run
### Frontend (React)
1. Clona el repositorio del frontend:
   ```
   https:https://github.com/ASaintG/SystemTravel/tree/main/Frontend/systemTravel
2. Instala las dependencias:
   ```
   npm install
3. Inicia la aplicación:
   ```
   npm start
### Uso
- Inicia el backend para tener la API disponible.
- Inicia el frontend y accede a la interfaz de usuario.
- Agrega la Db a tu gestor favorito
- Inicia sesión con tu usuario.
- utiliza estas credenciales :
   - username: "admin"
   - password: "admin1"
- Accede a las secciones del sistema según tu rol.
- Registra sucursales y distancias.
- Registra viajes de colaboradores.
- Genera reportes para conocer los viajes realizados y montos a pagar
