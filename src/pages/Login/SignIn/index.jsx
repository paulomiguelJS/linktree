import { Logo } from "../../../components/Logo";

import { Container, UserProfile, FormContainer } from "./styles";

import { FcGoogle } from "react-icons/fc";

import { auth } from "../../../services/firebaseConnection";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { toast } from "react-toastify";

import { Input } from "../../../components/Input";

export function SignIn() {
  const [user, setUser] = useState({});

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();

    if (email === "" || password === "") {
      alert("Please fill the fields");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/admin", { replace: true  });
        toast.success("Welcome to our plataform");

      })
      .catch(() => {
        toast.error("Error, try again");
        console.log("Error");
      });
  }

  function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/admin", { replace: true  });
        setUser(result.user);

        toast.success("Welcome to our plataform");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Container>
      <Logo />
      <h1>Access your account</h1>
      <UserProfile>
        {user.photoURL && (
          <img
            src={user.photoURL}
            alt="Profile Photo"
            referrerpolicy="no-referrer"
          />
        )}
        <strong>{user.displayName}</strong>
        <small>{user.email}</small>
      </UserProfile>

      <FormContainer onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="joe@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="********"
          autoComplete="on"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="logInBtn" type="submit">
          Log In
        </button>
        <strong>OR</strong>
        <button type="button" onClick={handleGoogleSignIn}>
          <FcGoogle size={24} color="#fff" /> Login in with google
        </button>
        <span>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </span>
      </FormContainer>
    </Container>
  );
}
