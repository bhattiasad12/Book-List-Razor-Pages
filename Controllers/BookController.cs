using BookListRazor.Model;
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

        [BindProperty]
        public Book Book { get; set; }

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
        [HttpGet("Book/Edit")]
        public async Task<Book> Edit(int id)
        {
            var data = await _db.Book.Where(i => i.Id == id).SingleAsync();
            return data;
        }

        [HttpPut("Book/Update")]
        public async Task Update(Book data)
        {
            var BookFromDb = await _db.Book.Where(i => i.Id == data.Id).SingleAsync();

            BookFromDb.Name = data.Name;
            BookFromDb.ISBN = data.ISBN;
            BookFromDb.Author = data.Author;
            _db.Book.Update(BookFromDb);
            await _db.SaveChangesAsync();
        }
    }

}