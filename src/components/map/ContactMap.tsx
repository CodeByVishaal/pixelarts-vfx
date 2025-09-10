const ContactMap = () => {
  return (
    <>
      <div className="maps-area bg-gray overflow-hidden">
        <div className="google-maps">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3886.917141266411!2d80.18394087507768!3d13.0409459872808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTPCsDAyJzI3LjQiTiA4MMKwMTEnMTEuNSJF!5e0!3m2!1sen!2sin!4v1757517063829!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default ContactMap;
