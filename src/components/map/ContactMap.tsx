const ContactMap = () => {
  return (
    <>
      <div className="maps-area bg-gray overflow-hidden">
        <div className="google-maps">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3150.691548946466!2d144.65300717555291!3d-37.844106335772224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad68f0719aab5df%3A0xdb2c77710f35548b!2s13%20Tyler%20Cres%2C%20Tarneit%20VIC%203029%2C%20Australia!5e0!3m2!1sen!2sin!4v1757007682508!5m2!1sen!2sin"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default ContactMap;
