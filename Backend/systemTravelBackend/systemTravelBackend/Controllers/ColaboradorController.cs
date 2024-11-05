using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using systemTravelBackend.CasosDeUso;
using systemTravelBackend.Dtos;
using systemTravelBackend.Repository;

namespace systemTravelBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ColaboradorController : ControllerBase
    {
        private readonly ColaboradorRepository _context;

        public ColaboradorController(ColaboradorRepository context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetColaboradores()
        {
            var colaboradores = await _context.colaboradores.Select(c => c.ToDto()).ToListAsync();
            return Ok(colaboradores);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetColaboradores(long id)
        {
            // Busca el viaje por ID
            var colaboradore = await _context.colaboradores
                .Where(v => v.Id == id)
                .Select(v => v.ToDto())
                .FirstOrDefaultAsync();

            if (colaboradore == null)
            {
                return NotFound(); // Retorna un 404 si no se encuentra el viaje
            }

            return Ok(colaboradore); // Retorna el viaje encontrado
        }
        [HttpPost]
        public async Task<IActionResult> CreateColaborador(CreateColaboradorDto colaboradorDto)
        {
            var colaborador = await _context.AddColaborador(colaboradorDto);
            return CreatedAtAction(nameof(GetColaboradores), new { id = colaborador.Id }, colaborador.ToDto());
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class SucursalController : ControllerBase
    {
        private readonly ColaboradorRepository _context;

        public SucursalController(ColaboradorRepository context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetSucursales()
        {
            var sucursales = await _context.Sucursales.Select(s => s.ToDto()).ToListAsync();
            return Ok(sucursales);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSucursales(long id)
        {
            // Busca el viaje por ID
            var sucursales = await _context.Sucursales
                .Where(v => v.Id == id)
                .Select(v => v.ToDto())
                .FirstOrDefaultAsync();

            if (sucursales == null)
            {
                return NotFound(); // Retorna un 404 si no se encuentra el viaje
            }

            return Ok(sucursales); // Retorna el viaje encontrado
        }

        [HttpPost]
        public async Task<IActionResult> CreateSucursal(CreateSucursalDto sucursalDto)
        {
            var sucursal = await _context.AddSucursal(sucursalDto);
            return CreatedAtAction(nameof(GetSucursales), new { id = sucursal.Id }, sucursal.ToDto());
        }


    }
    public class LoginController : ControllerBase
    {
        private readonly ColaboradorRepository _context;

        public LoginController(ColaboradorRepository context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            // Autenticamos al usuario usando el método modificado
            var usuario = await _context.AuthenticateUser(loginDto.Username, loginDto.Password);

            if (usuario == null)
            {
                return Unauthorized(new { message = "Usuario o contraseña incorrectos" });
            }

            return Ok(new { message = "Login exitoso", usuario = usuario.ToDto() });
        }



        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] CreateUsuarioDto usuarioDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var usuario = await _context.AddUsuario(usuarioDto);
            return CreatedAtAction(nameof(Login), new { id = usuario.Id }, usuario.ToDto());
        }


    }
    [ApiController]
    [Route("api/[controller]")]
    public class ViajeController : ControllerBase
    {
        private readonly ColaboradorRepository _context;

        public ViajeController(ColaboradorRepository context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateViaje(CreateViajeDto viajeDto)
        {
            try
            {
                var viaje = await _context.AddViaje(viajeDto);
                return CreatedAtAction(nameof(CreateViaje), new { id = viaje.Id }, viaje);
            }
            catch (InvalidOperationException ex)
            {
                // Retorna un error 400 con el mensaje si ya existe un viaje para esa fecha
                return BadRequest(new { error = ex.Message });
            }
        }
        
        [HttpGet]
        public async Task<IActionResult> GetViajes()
        {
            var viajes = await (from v in _context.viajes
                                join u in _context.colaboradores on v.id_colaboradores_sucursales equals u.Id
                                join t in _context.transportistas on v.IdTransportista equals t.Id
                                select new ViajesDto
                                {
                                    Id = v.Id,
                                    id_colaboradores_sucursales = v.id_colaboradores_sucursales,
                                    IdTransportista = v.IdTransportista,
                                    Fecha = v.Fecha,
                                    TotalKilometros = v.TotalKilometros,
                                    TotalPago = v.TotalPago,
                                    NombreColaborador = u.Nombre,
                                    NombreTransportista = t.Nombre
                                }).ToListAsync();

            return Ok(viajes);
        }
        [HttpGet("transportistaview")]
        public async Task<IActionResult> GetViajesByTransportista(int idTransportista, DateTime fechaInicio, DateTime fechaFin)
        {
            var viajes = await (from v in _context.viajes
                                join t in _context.transportistas on v.IdTransportista equals t.Id
                                where v.Fecha >= fechaInicio && v.Fecha <= fechaFin
                                      && t.Id == idTransportista
                                select new ViajesDto
                                {
                                    Id = v.Id,
                                    Fecha = v.Fecha,
                                    TotalKilometros = v.TotalKilometros,
                                    TotalPago = v.TotalPago,
                                    NombreTransportista = t.Nombre
                                }).ToListAsync();

            return Ok(viajes);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetViaje(long id)
        {
            // Busca el viaje por ID
            var viaje = await _context.viajes
                .Where(v => v.Id == id)
                .Select(v => v.ToDto())
                .FirstOrDefaultAsync();

            if (viaje == null)
            {
                return NotFound(); // Retorna un 404 si no se encuentra el viaje
            }

            return Ok(viaje); // Retorna el viaje encontrado
        }

    }

    [ApiController]
    [Route("api/[controller]")]
    public class TransportistasController : ControllerBase
    {
        private readonly ColaboradorRepository _context;

        public TransportistasController(ColaboradorRepository context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetTransportista()
        {
            var transportistas = await _context.transportistas.Select(s => s.ToDto()).ToListAsync();
            return Ok(transportistas);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTransportista(long id)
        {
            // Busca el viaje por ID
            var transportistas = await _context.transportistas
                .Where(v => v.Id == id)
                .Select(v => v.ToDto())
                .FirstOrDefaultAsync();

            if (transportistas == null)
            {
                return NotFound(); // Retorna un 404 si no se encuentra el viaje
            }

            return Ok(transportistas); // Retorna el viaje encontrado
        }
        [HttpPost]
        public async Task<IActionResult> CreateTransportista(CreateTransportistaDto transportistaDto)
        {
            var transportista = await _context.AddTransportistas(transportistaDto);
            return CreatedAtAction(nameof(GetTransportista), new { id = transportista.Id }, transportista);
        }

    }
    [ApiController]
    [Route("api/[controller]")]
    public class ColaboradoresSucursalesController : ControllerBase
    {
        private readonly ColaboradorRepository _context;

        public ColaboradoresSucursalesController(ColaboradorRepository context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetColaboradoresSucursales()
        {
            var colaboradorSucursal = await (from cs in _context.colaborador_sucursal
                                             join c in _context.colaboradores on cs.IdColaborador equals c.Id
                                             join s in _context.Sucursales on cs.IdSucursal equals s.Id
                                             select new ColaboradorSucursalDto
                                             {
                                                 Id = cs.Id,
                                                 IdColaborador = cs.IdColaborador,
                                                 IdSucursal = cs.IdSucursal,
                                                 DistanciaKm = cs.Distancia_km,
                                                 NombreColaborador = c.Nombre,
                                                 DireccionColaborador = c.Direccion,
                                                 NombreSucursal = s.Nombre,
                                                 DireccionSucursal = s.Ubicacion
                                             }).ToListAsync();

            return Ok(colaboradorSucursal);
        }




        [HttpGet("{id}")]
        public async Task<IActionResult> GetColaboradoresSucursales(long id)
        {
            var colaboradorSucursal = await (from cs in _context.colaborador_sucursal
                                             join c in _context.colaboradores on cs.IdColaborador equals c.Id
                                             join s in _context.Sucursales on cs.IdSucursal equals s.Id
                                             where cs.Id == id
                                             select new ColaboradorSucursalDto
                                             {
                                                 Id = cs.Id,
                                                 IdColaborador = cs.IdColaborador,
                                                 IdSucursal = cs.IdSucursal,
                                                 DistanciaKm = cs.Distancia_km,
                                                 NombreColaborador = c.Nombre,
                                                 DireccionColaborador = c.Direccion,
                                                 NombreSucursal = s.Nombre,
                                                 DireccionSucursal = s.Ubicacion
                                             }).FirstOrDefaultAsync();

            if (colaboradorSucursal == null)
            {
                return NotFound(); // Retorna un 404 si no se encuentra el colaborador
            }

            return Ok(colaboradorSucursal); // Retorna el colaborador encontrado
        }

        [HttpPost]
        public async Task<IActionResult> CreateColaboradoresSucursales(CreateColaborardorSucursalDto createColaborardorSucursalDto)
        {
            var colaboradorSucursal = await _context.AddColaborardorSucursal(createColaborardorSucursalDto);
            return CreatedAtAction(nameof(GetColaboradoresSucursales), new { id = colaboradorSucursal.Id }, colaboradorSucursal);
        }

    }

}
