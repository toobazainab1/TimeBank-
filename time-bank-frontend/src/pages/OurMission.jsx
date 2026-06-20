const OurMission = () => {
  return (
    <section
      id="mission"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: "50px 20px",
        minHeight: "82vh", // fixed spacing issue
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          fontSize: "2.5rem", // more responsive
          fontWeight: 700,
          marginBottom: "20px",
          lineHeight: 1.2,
        }}
      >
        Our Mission
      </h2>
      <p
        style={{
          fontSize: "1.125rem", // 18px equivalent
          lineHeight: 1.8,
          maxWidth: "700px",
          margin: "0 auto",
          color: "#333", // better readability
        }}
      >
        Our mission is to empower students by creating a collaborative community
        where skills and knowledge are exchanged freely. At{" "}
        <strong>Time Bank</strong>, we value <strong>time over money </strong>
        rewarding contribution and learning with time credits, fostering growth,
        connection, and opportunity for every student.
      </p>
    </section>
  );
};

export default OurMission;
