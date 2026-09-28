export default function Contacts() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-6">Контакты</h1>
      <p>Адрес: г. Москва, ул. Геймерская, д. 1</p>
      <p>Телефон: +7 (999) 123-45-67</p>
      <p>Email: info@pcclub.ru</p>
      <div className="mt-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.372!2d37.6173!3d55.7558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTXCsDQ1JzIwLjkiTiAzN8KwMzcnMDIuMyJF!5e0!3m2!1sru!2sru!4v1620000000000!5m2!1sru!2sru"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}