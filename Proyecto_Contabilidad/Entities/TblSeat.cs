namespace Entities.Entities
{
    public class TblSeat
    {
        public int? ID { get; set; }
        public string DATE_SEAT { get; set; } = String.Empty;
        public string CURRENCY { get; set; } = String.Empty;
        public decimal? EXCHANGE_RATE { get; set; }
        public string REFERENCE { get; set; } = String.Empty;
        public int CUSTOMER_ID { get; set; }
        public bool STATUS { get; set; }
    }
}
