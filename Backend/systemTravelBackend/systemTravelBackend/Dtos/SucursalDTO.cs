using System.ComponentModel.DataAnnotations;

namespace systemTravelBackend.Dtos
{
    public class SucursalDto
    {
        public long Id { get; set; }
        public string Nombre { get; set; }
        public string Ubicacion { get; set; }
        
    }

    public class CreateSucursalDto
    {
        [Required(ErrorMessage = "El nombre es requerido")]
        public string Nombre { get; set; }

        public string Ubicacion { get; set; }

    }
}
