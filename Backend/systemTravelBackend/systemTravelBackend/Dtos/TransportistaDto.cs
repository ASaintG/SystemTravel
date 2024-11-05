namespace systemTravelBackend.Dtos
{
    public class TransportistaDto
    {
        public long Id { get; set; }
        public string Nombre { get; set; }

        public double Tarifa_por_km { get; set; }
    }

    public class CreateTransportistaDto
    {
        public string Nombre { get; set; }

        public double Tarifa_por_km { get; set; }
    }
}
