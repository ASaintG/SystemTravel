using System.ComponentModel.DataAnnotations;

namespace systemTravelBackend.Dtos
{
    public class LoginDto
    {
        [Required(ErrorMessage = "El nombre de usuario es requerido")]
        public string Username { get; set; }

        [Required(ErrorMessage = "La contraseña es requerida")]
        public string Password { get; set; }
        public long perfil {  get; set; }

      
    }
   
}
