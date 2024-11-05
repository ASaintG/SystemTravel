using systemTravelBackend.Dtos;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using static Mysqlx.Crud.Order.Types;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.ComponentModel.DataAnnotations;
namespace systemTravelBackend.Repository
{
    public class ColaboradorRepository : DbContext
    {
        public ColaboradorRepository(DbContextOptions<ColaboradorRepository> options)
        : base(options) { }

        public DbSet<ColaboradorEntity> colaboradores { get; set; }
        public DbSet<SucursalEntity> Sucursales { get; set; }
        public DbSet<LoginEntity> usuarios { get; set; }
        public DbSet<ViajeEntity> viajes { get; set; }
        public DbSet<TransportistaEntity> transportistas { get; set; }
        public DbSet<ColaborardorSucursalEntity> colaborador_sucursal { get; set; }
    
       

        // Métodos para manejar colaboradores
        public async Task<ColaboradorEntity?> GetColaborador(long id) =>
            await colaboradores.FirstOrDefaultAsync(x => x.Id == id);

        public async Task<TransportistaEntity?> GetTransportista(long id) =>
           await transportistas.FirstOrDefaultAsync(x => x.Id == id);
        public async Task<ViajeEntity?> Getviajes(long id) =>
          await viajes.FirstOrDefaultAsync(x => x.Id == id);
        public async Task<LoginEntity> AddUsuario(CreateUsuarioDto usuarioDto)
        {
            // Hasheamos la contraseña antes de guardarla
            string contrasenaHasheada = BCrypt.Net.BCrypt.HashPassword(usuarioDto.Password);

            var entity = new LoginEntity
            {
                Username = usuarioDto.Username,
                Password = contrasenaHasheada, // Guardamos la contraseña hasheada
               perfil=usuarioDto.perfil,
               id_transportista= usuarioDto.id_transportista,
               id_colaborador =usuarioDto.id_colaborador
            };

            await usuarios.AddAsync(entity);
            await SaveChangesAsync();
            return entity;
        }

        public async Task<LoginEntity?> AuthenticateUser(string username, string password)
        {
            var usuario = await usuarios.FirstOrDefaultAsync(c => c.Username == username);

            // Verificamos si el usuario existe y si la contraseña es correcta
            if (usuario != null && BCrypt.Net.BCrypt.Verify(password, usuario.Password))
            {
                return usuario;
            }

            return null; // Usuario no encontrado o contraseña incorrecta
        }

        public async Task<ColaboradorEntity> AddColaborador(CreateColaboradorDto colaboradorDto)
        {
            var entity = new ColaboradorEntity
            {
                Nombre = colaboradorDto.Nombre,
                Direccion = colaboradorDto.Direccion
            };

            await colaboradores.AddAsync(entity);
            await SaveChangesAsync();
            return entity;
        }

        // Métodos para manejar sucursales
        public async Task<SucursalEntity?> GetSucursal(long id) =>
            await Sucursales.FirstOrDefaultAsync(x => x.Id == id);

        public async Task<SucursalEntity> AddSucursal(CreateSucursalDto sucursalDto)
        {
            var entity = new SucursalEntity
            {
                Nombre = sucursalDto.Nombre,
                Ubicacion = sucursalDto.Ubicacion,
            };

            await Sucursales.AddAsync(entity);
            await SaveChangesAsync();
            return entity;
        }
        public async Task<TransportistaEntity> AddTransportistas(CreateTransportistaDto transportistaDto)
        {
            var entity = new TransportistaEntity
            {
                Nombre = transportistaDto.Nombre,
                Tarifa_por_km = transportistaDto.Tarifa_por_km,
            };

            await transportistas.AddAsync(entity);
            await SaveChangesAsync();
            return entity;
        }
        public async Task<ViajeEntity> AddViaje(CreateViajeDto viajeDto)
        {
            // Convertir la fecha del viaje a solo la parte de fecha (sin hora)
            var fechaSinHora = viajeDto.Fecha.Date;

            // Comprobar si ya existe un viaje para el colaborador en la misma fecha
            var viajeExistente = await viajes.FirstOrDefaultAsync(v =>
                v.id_colaboradores_sucursales == viajeDto.id_colaboradores_sucursales &&
                v.Fecha.Date == fechaSinHora);

            if (viajeExistente != null)
            {
                // Lanza una excepción o devuelve un error si ya existe un viaje para esa fecha y colaborador
                throw new InvalidOperationException("Este colaborador ya tiene un viaje registrado para esta fecha.");
            }

            // Si no existe un viaje, crear la nueva entidad
            var entity = new ViajeEntity
            {
                id_colaboradores_sucursales = viajeDto.id_colaboradores_sucursales,
                IdTransportista = viajeDto.IdTransportista,
                Fecha = fechaSinHora, // Guardar solo la fecha sin la hora
                TotalKilometros = viajeDto.TotalKilometros,
                TotalPago = viajeDto.TotalPago
            };

            await viajes.AddAsync(entity);
            await SaveChangesAsync();
            return entity;
        }


        public async Task<ColaborardorSucursalEntity?> GetColaborardorSucursal(long id) =>
         await colaborador_sucursal.FirstOrDefaultAsync(x => x.Id == id);
        public async Task<ColaborardorSucursalEntity> AddColaborardorSucursal(CreateColaborardorSucursalDto colaborardorSucursalDto)
        {

           var entity = new ColaborardorSucursalEntity
           {
               IdColaborador = colaborardorSucursalDto.IdColaborador,
               IdSucursal = colaborardorSucursalDto.IdSucursal,
               Distancia_km = colaborardorSucursalDto.Distancia_km
              
           };

            await colaborador_sucursal.AddAsync(entity);
            await SaveChangesAsync();
            return entity;
        }
    }

    public class ColaboradorEntity
    {
        [Column("id_colaborador")]
        public long Id { get; set; }
        public string Nombre { get; set; }
        public string Direccion { get; set; }

        public ColaboradorDto ToDto() => new ColaboradorDto
        {
            Id = Id,
            Nombre = Nombre,
            Direccion = Direccion
        };
    }
    
    public class SucursalEntity
    {
        [Column("id_sucursal")]
        public long Id { get; set; }
        public string Nombre { get; set; }
        [Column("direccion")]
        public string Ubicacion { get; set; }

        public SucursalDto ToDto() => new SucursalDto
        {
            Id = Id,
            Nombre = Nombre,
            Ubicacion = Ubicacion
        };
    }
    //propiedades de login
    public class LoginEntity

    {
        [Key]
        [Column("id_usuario")]
        public int Id { get; set; }
        [Column("nombre_usuario")]
        public string Username { get; set; }
        [Column("contrasena")]
        public string Password { get; set; }
        [Column("perfil")]
        public long perfil { get; set; }
        public long? id_colaborador { get; set; }
        public long? id_transportista { get; set; }
       
       

        public LoginDto ToDto() => new LoginDto
        {

            Username = Username,
            Password = Password,
            perfil=perfil

        };
    }
    public class TransportistaEntity
    {
        [Column("id_transportista")]
        public long Id { get; set; }
        public string Nombre { get; set; }

        public double Tarifa_por_km { get; set; }
        public TransportistaDto ToDto() => new TransportistaDto
        {
            Id=Id,
            Nombre = Nombre,
            Tarifa_por_km = Tarifa_por_km
        };
    }

    public class ViajeEntity
    {
        [Key]
        [Column("id_viaje")]
        public long Id { get; set; }

        [Column("id_colaboradores_sucursales")]
        public long id_colaboradores_sucursales { get; set; }

        [Column("id_transportista")]
        public long IdTransportista { get; set; }

        [Column("fecha")]
        public DateTime Fecha { get; set; }

        [Column("total_km")]
        public double TotalKilometros { get; set; }

        [Column("total_pago")]
        public double TotalPago { get; set; }

     

        public ViajesDto ToDto() => new ViajesDto
        {
            Id = Id,
            id_colaboradores_sucursales = id_colaboradores_sucursales,
            IdTransportista = IdTransportista,
            Fecha = Fecha,
            TotalKilometros = TotalKilometros,
            TotalPago = TotalPago,
          
        };
    }

    public class ColaborardorSucursalEntity
    {
        public long Id { get; set; }
        [Column("id_colaborador")]
        public long IdColaborador { get; set; }
        [Column("id_sucursal")]
        public long IdSucursal { get; set; }
        [Column("distancia_km")]
        public double Distancia_km { get; set; }
    
    public ColaboradorSucursalDto ToDto() => new ColaboradorSucursalDto
        {
            Id = Id,
            IdColaborador = IdColaborador,
            IdSucursal = IdSucursal,
            DistanciaKm = Distancia_km
        };
    }

   

}
