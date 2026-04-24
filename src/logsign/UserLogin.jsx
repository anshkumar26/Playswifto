import React, { useMemo, useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";


const BackButton =()=>{
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      aria-label="Go back"
      className="absolute top-6 left-6 sm:top-10 sm:left-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden shadow-lg hover:shadow-xl hover:shadow-[0_20px_50px_rgba(30,136,229,0.20)] transition-transform active:scale-95 z-20"
    >
      <svg viewBox="0 0 256 256" className="w-full h-full" role="img" aria-hidden="true">
        <circle cx="128" cy="128" r="128" fill="#40C4FF" />
        <path
          d="M135.8 78.5c8.4-8.4 22-8.4 30.4 0 8.4 8.4 8.4 22 0 30.4L128.1 147l38.1 38.1c8.4 8.4 8.4 22 0 30.4-8.4 8.4-22 8.4-30.4 0l-53.3-53.3c-8.4-8.4-8.4-22 0-30.4l53.3-53.3z"
          fill="#FFFFFF"
        />
      </svg>
    </button>
  )
}

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => {
    return form.email.trim().length > 0 && form.password.length > 0 && !loading;
  }, [form.email, form.password, loading]);

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const userCred = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const token = await userCred.user.getIdToken();

      const res = await fetch("http://localhost:5000/auth/login", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || "Login failed. Please try again.");
      }

      localStorage.setItem("user", JSON.stringify(data));

      alert("Login successful");
    } catch (err) {
      console.error(err);
      setError(err?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);

      alert("Google Login Successful");
    } catch (err) {
      console.error(err);
      setError(err?.message || "Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen ps-bg-hero flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative blobs (match Landing hero) */}
      <BackButton/>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 right-10 w-64 h-64 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(30,136,229,0.12)" }}
        />
        <div
          className="absolute bottom-20 left-0 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(179,229,252,0.12)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(30,136,229,0.08)" }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-login" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-login)" />
        </svg>
      </div>


      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-7 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[color:var(--ps-primary)] rounded-xl flex items-center justify-center shadow-[0_0_40px_rgba(30,136,229,0.35)]">
              <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-white font-extrabold text-xl tracking-tight">
                Play<span className="text-[color:var(--ps-primary)]">Swifto</span>
              </p>
              <p className="text-white/50 text-sm">Log in to continue</p>
            </div>
          </div>

          {error ? (
            <div className="mb-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2">Email</label>
              <input
                name="email"
                value={form.email}
                placeholder="you@example.com"
                onChange={handleChange}
                autoComplete="email"
                className="w-full rounded-2xl bg-white/10 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-[color:var(--ps-primary-2)] focus:ring-2 focus:ring-[color:var(--ps-primary)] focus:ring-opacity-20 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2">Password</label>
              <input
                name="password"
                value={form.password}
                type="password"
                placeholder="••••••••"
                onChange={handleChange}
                autoComplete="current-password"
                className="w-full rounded-2xl bg-white/10 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-[color:var(--ps-primary-2)] focus:ring-2 focus:ring-[color:var(--ps-primary)] focus:ring-opacity-20 transition"
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={!canSubmit}
              className="w-full bg-[color:var(--ps-primary)] hover:bg-[color:var(--ps-primary-2)] disabled:hover:bg-[color:var(--ps-primary)] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm px-6 py-3.5 rounded-2xl transition-colors shadow-sm hover:shadow-md hover:shadow-[0_20px_50px_rgba(30,136,229,0.18)]"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            <div className="flex items-center gap-3 py-1">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-xs text-white/40 font-semibold">OR</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white text-gray-900 font-bold text-sm px-6 py-3.5 rounded-2xl hover:bg-gray-50 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Continue with Google
            </button>

            <p className="text-center text-sm text-white/50 pt-1">
              Don’t have an account?{" "}
              <a className="text-[color:var(--ps-accent-1)] hover:text-[color:var(--ps-accent-2)] font-semibold" href="/signup">
                Sign up
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-white/30 mt-6">
          By continuing, you agree to PlaySwifto’s Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Login;