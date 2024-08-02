import React, { useEffect, useState } from "react";
import { Accordion, Card, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UserContext";
import axios from "axios";

const WelcomePage = () => {
  const { userInformation } = useAuth();
  const navigate = useNavigate();

  const handleChoice = async (choice) => {
    try {
      const request = await axios.put(
        `/auth/user-auth?id=${userInformation.id}`
      );
      if (request.status === 200) {
        navigate(choice);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (
      userInformation &&
      userInformation.role === "USER" &&
      userInformation.id
    ) {
      const handleFetchData = async () => {
        try {
          const request = await axios(
            `/auth/user-auth?id=${userInformation.id}`
          );
          if (request.status === 200) {
            console.log(request.data.data.isFirstTime);
            if (!request.data.data.isFirstTime) {
              navigate("/home");
            }
          }
        } catch (e) {
          console.log(e);
        }
      };
      handleFetchData();
    }
  }, [userInformation]);

  // console.log(
  //   !userInformation,
  //   userInformation.role !== "USER",
  //   !userInformation.id
  // );

  if (
    !userInformation ||
    userInformation.role !== "USER" ||
    !userInformation.id
  ) {
    return navigate("/home");
  }
  return (
    <Container>
      <h2>Welcome! What do you want to do?</h2>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>I want to find a job</Accordion.Header>
          <Accordion.Body>
            <p>
              Embarking on a job search can feel daunting yet exhilarating,
              offering a path to new opportunities and professional growth.
              Whether you're seeking your first job or aiming to switch careers,
              the initial step is to clarify your goals. Understanding what you
              value in a job—be it growth potential, flexibility, or specific
              benefits—helps narrow your search to roles that truly fit.
              Crafting a tailored resume is crucial. Highlight skills and
              experiences that align with the job you're applying for, making
              your resume a compelling reflection of why you're the ideal
              candidate. In today's digital age, leveraging online platforms
              like LinkedIn not only enhances your visibility but also connects
              you to a vast network of professionals and potential job
              opportunities.
            </p>
            <Button onClick={() => handleChoice("/market")}>Proceed</Button>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>I want to hire</Accordion.Header>
          <Accordion.Body>
            <p>
              Hiring the right talent is pivotal for any organization's success.
              It starts with crafting a clear and enticing job description that
              highlights not only the responsibilities and necessary skills but
              also the unique benefits and culture of your company. Utilizing a
              mix of traditional job boards, social media platforms, and
              professional networks can broaden your reach. Equally important is
              designing an interview process that not only assesses skills and
              compatibility but also promotes your company as an ideal
              workplace. Effective hiring is not just about filling a vacancy;
              it's about fostering a long-term partnership that drives mutual
              growth and innovation.
            </p>
            <Button onClick={() => handleChoice("/employer")}>Proceed</Button>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>I just want to join the community</Accordion.Header>
          <Accordion.Body>
            <p>
              Joining a community offers invaluable networking opportunities and
              access to shared knowledge. It's about connecting with like-minded
              individuals and engaging in meaningful conversations that foster
              both personal and professional growth.
            </p>
            <Button onClick={() => handleChoice("/home")}>Proceed</Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default WelcomePage;
