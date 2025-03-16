import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">FOKIS</h3>
            <p className="text-sm text-muted-foreground">
              Platfòm nouvèl dijital konplè pou Ayiti
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Kategori</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/category/aktyalite">Aktyalite</Link></li>
              <li><Link href="/category/ekonomi-finans">Ekonomi & Finans</Link></li>
              <li><Link href="/category/teknoloji-ai">Teknoloji & AI</Link></li>
              <li><Link href="/category/agrikilti-eneji">Agrikilti & Enèji</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Lòt Kategori</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/category/kilti-medya">Kilti & Medya</Link></li>
              <li><Link href="/category/sante-byennet">Sante & Byennèt</Link></li>
              <li><Link href="/category/edikasyon-job">Edikasyon & Job</Link></li>
              <li><Link href="/category/anviwonman">Anviwònman</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Kontakte</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: info@fokis.ht</li>
              <li>Tel: +509 xxxx-xxxx</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FOKIS. Tout dwa rezève.</p>
        </div>
      </div>
    </footer>
  );
}
