using System.ComponentModel.DataAnnotations;

namespace systemTravelBackend.Dtos
{
    public class ViajesDto
    {
        public long Id { get; set; }
        [Required]
        public long id_colaboradores_sucursales { get; set; }

        [Required]
        public long IdTransportista { get; set; }

        [Required]
        public DateTime Fecha { get; set; }

        public double TotalKilometros { get; set; }
        public double TotalPago { get; set; }

        public string NombreColaborador { get; set; } // Agregado para devolver el nombre del colaborador
        public string NombreTransportista { get; set; } // Agregado para devolver el nombre del transportista
        public string Usuario { get; set; }
    }
}
