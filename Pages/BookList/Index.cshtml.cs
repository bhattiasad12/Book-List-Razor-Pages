using BookListRazor.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookListRazor.Pages.BookList
{
    public class IndexModel : PageModel
    {
        private readonly ApplicationDbContext _Db;

        public IndexModel(ApplicationDbContext db)
        {
            _Db = db;
        }

        public IEnumerable<Book> Books { get; set; }

        public async Task OnGet()
        {
            Books = await _Db.Book.ToListAsync();
        }

        public async Task<IActionResult> OnPostDelete(int id)
        {
            var book = await _Db.Book.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }
            _Db.Book.Remove(book);
            await _Db.SaveChangesAsync();

            return RedirectToPage("Index");
        }
    }
}
