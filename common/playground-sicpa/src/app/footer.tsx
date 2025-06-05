export default function Footer() {
  return (
    <footer className='sticky bottom-0'>
      <div className='items-center justify-center p-2'>
        <p>Sicpa &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}