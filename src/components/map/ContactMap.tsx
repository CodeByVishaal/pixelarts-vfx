const ContactMap = () => {
  return (
    <>
      <div className="maps-area bg-gray overflow-hidden">
        <div className="google-maps">
          <iframe src="https://www.google.com/maps?q=Chennai,+Tamil+Nadu,+India&hl=en&z=12&output=embed" />
        </div>
      </div>
    </>
  );
};

export default ContactMap;
