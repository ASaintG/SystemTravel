using Org.BouncyCastle.Asn1.Mozilla;

namespace systemTravelBackend.Dtos
{
    public class ColaboradorSucursalDto
    {
        public long Id { get; set; }
        public long IdColaborador { get; set; }
        public long IdSucursal { get; set; }
        public double DistanciaKm { get; set; }
        public string NombreColaborador { get; set; }
        public string DireccionColaborador { get; set; }
        public string NombreSucursal { get; set; }
        public string DireccionSucursal { get; set; }
    }


    public class CreateColaborardorSucursalDto
    {
        
        public long IdColaborador { get; set; }
        public long IdSucursal { get; set; }
        public double Distancia_km { get; set; }
    }
}
