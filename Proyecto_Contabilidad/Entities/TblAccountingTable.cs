namespace Proyecto_Contabilidad.Entities
{
    public class TblAccountingTable
    {
        public int ID { get; set; }
        public decimal MONTO { get; set; }
        public string Currency { get; set; }
        public int ID_CUENTA { get; set; }
        public string DESCRIPCION { get; set; }
        public int ID_ASIENTO { get; set; }
    }

}
