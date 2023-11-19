using Microsoft.AspNetCore.Mvc;
using Proyecto_Contabilidad.Entities;
using System.Data.SqlClient;

namespace Proyecto_Contabilidad.Controllers
{
    public class AccountingTableController : Controller
    {
        string connectionString = "Data Source=CHUZLAPTOP;Initial Catalog=AccountingSoftDB;Integrated Security=True;";


        public IActionResult InsertAccountingRecord(decimal monto, string currency, int idCuenta, string descripcion, int idAsiento)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                // Consulta SQL para la inserción
                string insertQuery = "INSERT INTO tblAccountingTable (MONTO, Currency, ID_CUENTA, DESCRIPCION, ID_ASIENTO) " +
                    "VALUES (@Monto, @Currency, @IdCuenta, @Descripcion, @IdAsiento)";

                using (SqlCommand command = new SqlCommand(insertQuery, connection))
                {
                    // Parámetros
                    command.Parameters.AddWithValue("@Monto", monto);
                    command.Parameters.AddWithValue("@Currency", currency);
                    command.Parameters.AddWithValue("@IdCuenta", idCuenta);
                    command.Parameters.AddWithValue("@Descripcion", descripcion);
                    command.Parameters.AddWithValue("@IdAsiento", idAsiento);

                    command.ExecuteNonQuery();
                }
            }
            return View();
        }

        public IActionResult GetAccountingData(int idCuenta)
        {
            // Crear una lista para almacenar los resultados
            List<TblAccountingTable> accountingData = new List<TblAccountingTable>();

            // Crear la consulta SQL con un parámetro
            string sqlQuery = "SELECT * FROM tblAccountingTable WHERE ID_CUENTA = @ID_CUENTA";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    command.Parameters.AddWithValue("@ID_CUENTA", idCuenta);

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            // Mapear los datos a un modelo (AccountingDataModel)
                            TblAccountingTable data = new TblAccountingTable
                            {
                                ID = reader.GetInt32(0),
                                MONTO = reader.GetDecimal(1),
                                Currency = reader.GetString(2),
                                ID_CUENTA = reader.GetInt32(3),
                                DESCRIPCION = reader.GetString(4),
                                ID_ASIENTO = reader.GetInt32(5)
                            };
                            accountingData.Add(data);
                        }
                    }
                }
            }

            return View(accountingData);
        }

    }
}
