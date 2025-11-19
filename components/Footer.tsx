/**
 * Footer appears on every page of the site.  It includes the current
 * year and could be extended with additional links or social icons.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t mt-8 py-6 text-center text-sm text-gray-500">
      <div className="wrapper">
        &copy; {year} ToolsTide. All rights reserved.
      </div>
    </footer>
  );
}