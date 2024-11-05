using System.ComponentModel.DataAnnotations;

namespace systemTravelBackend.Dtos
{
    public class CreateViajeDto
    {
        [Required]
        public long id_colaboradores_sucursales { get; set; }

        [Required]
        public long IdTransportista { get; set; }

        [Required]
        public DateTime Fecha { get; set; }

        public double TotalKilometros { get; set; }
        public double TotalPago { get; set; }
    }

}
