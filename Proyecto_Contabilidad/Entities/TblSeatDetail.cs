namespace Entities.Entities
{
    public class TblSeatDetail
    {
        public int ID { get; set; }
        public int ACCOUNT_ID { get; set; }
        public decimal AMOUNT { get; set; }
        public string DESCRIPTION { get; set; } = String.Empty;
    }
}
