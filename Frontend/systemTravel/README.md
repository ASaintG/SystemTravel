# Sistema de Viajes

## Descripción del Proyecto

El **Sistema de Viajes** es una aplicación destinada a automatizar el registro y gestión de viajes de colaboradores a sus hogares, utilizando servicios de transporte contratados. Este sistema permite gestionar sucursales, registrar distancias y calcular automáticamente los pagos a transportistas.

## Situación Actual

Actualmente, el proceso de transporte de colaboradores se realiza de manera manual, lo que implica que al final de cada semana, se revisan listas y se calculan los pagos a transportistas. Esto puede resultar en errores y demoras. Este sistema busca simplificar y automatizar este proceso.

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

- **React**: Biblioteca para construir interfaces de usuario.
- **Chakra UI (v2.10.3)**: Librería de componentes para React que proporciona estilos y diseño.
- **Axios**: Biblioteca para realizar solicitudes HTTP desde el cliente.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/sistema-de-viajes.git

2. Navega a la carpeta del proyecto:
   ```cd sistema-de-viajes

3. instala las dependencias:
   ```npm install

 ## Uso
- Inicia sesión con tu usuario.
- Accede a las secciones del sistema según tu rol.
- Registra sucursales y distancias.
- Registra viajes de colaboradores.
- Genera reportes para conocer los viajes realizados y montos a pagar   


### Notas

- Asegúrate de personalizar el enlace del repositorio y la sección de licencia según corresponda.
