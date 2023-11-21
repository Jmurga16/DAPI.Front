namespace Entities.Entities
{
    public class TblSeat
    {
        public int Id { get; set; }
        public string CURRENCY { get; set; } = String.Empty;
        public decimal? EXCHANGE_RATE { get; set; }
        public string REFERENCE { get; set; } = String.Empty;
        public bool STATUS { get; set; }
    }
}
