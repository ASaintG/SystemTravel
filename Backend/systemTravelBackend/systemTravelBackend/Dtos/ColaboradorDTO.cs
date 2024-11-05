using System.ComponentModel.DataAnnotations;

namespace systemTravelBackend.Dtos
{
    public class ColaboradorDto
    {
        public long Id { get; set; }
        public string Nombre { get; set; }
     
        public string Direccion { get; set; }
    }

    public class CreateColaboradorDto
    {
        [Required(ErrorMessage = "El nombre es requerido")]
        public string Nombre { get; set; }

        public string Direccion { get; set; }
    }
}
