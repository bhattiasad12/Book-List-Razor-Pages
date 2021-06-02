using BookListRazor.Model;
using BookListRazor.Pages.BookList;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace BookListRazor.Controllers
{
    public class BookController : Controller
    {
        private readonly ApplicationDbContext _db;
        public BookController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet("book/GetAll")]
        public IActionResult GetAll()
        {
            return Json(new { data = _db.Book.ToList() });
        }

        [HttpDelete("book/delete")]
        public IActionResult Delete(int id)
        {
            var bookFromDb = _db.Book.FirstOrDefault(u => u.Id == id);
            if (bookFromDb == null)
            {
                return Json(new { success = false, message = "Error while Deleting" });
            }
            _db.Book.Remove(bookFromDb);
            _db.SaveChanges();
            return Json(new { success = true, message = "Delete successful" });
        }
    }
}