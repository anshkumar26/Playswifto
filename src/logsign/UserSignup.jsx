import React, { useMemo, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
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
  );
};

const UserSignup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
    adminKey: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => {
    if (loading) return false;
    if (!form.name.trim() || !form.email.trim() || !form.password) return false;
    if (form.role === "ADMIN" && !form.adminKey.trim()) return false;
    return true;
  }, [form, loading]);

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      setLoading(true);
      setError("");
      const userCred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const token = await userCred.user.getIdToken();

      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          role: form.role,
          adminKey: form.adminKey,
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.message || "Signup failed. Please try again.");
      }

      alert("Signup successful");
    } catch (err) {
      console.error(err);
      setError(err?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();

      const res = await fetch("http://localhost:5000/auth/google", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: "USER", // default
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.message || "Google signup failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError(err?.message || "Google signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen ps-bg-hero flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative blobs + subtle grid (match Landing hero) */}
      <BackButton />
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
            <pattern id="grid-signup" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-signup)" />
        </svg>

        {/* Sports-themed drifting icons */}
        <div className="absolute -top-6 left-6 text-5xl text-white/10 playswifto-drift" style={{ animationDelay: "0.2s" }}>
          ⚽
        </div>
        <div className="absolute top-24 -right-4 text-6xl text-white/10 playswifto-drift-slow" style={{ animationDelay: "0.9s" }}>
          🏀
        </div>
        <div className="absolute bottom-16 left-10 text-6xl text-white/10 playswifto-drift-fast" style={{ animationDelay: "0.4s" }}>
          🏸
        </div>
        <div className="absolute bottom-10 right-16 text-5xl text-white/10 playswifto-drift" style={{ animationDelay: "1.2s" }}>
          🎾
        </div>
        <div className="absolute top-1/2 left-2 text-5xl text-white/10 playswifto-drift-slow" style={{ animationDelay: "1.6s" }}>
          🏏
        </div>
      </div>

      <div className="w-full max-w-md relative z-10 playswifto-fade-up">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-7 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[color:var(--ps-primary)] rounded-xl flex items-center justify-center shadow-[0_0_40px_rgba(30,136,229,0.35)]">
                <span className="text-white text-xl">🏆</span>
              </div>
              <div>
                <p className="text-white font-extrabold text-xl tracking-tight">
                  Play<span className="text-[color:var(--ps-primary)]">Swifto</span>
                </p>
                <p className="text-white/50 text-sm">Create your account</p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 playswifto-float">
              {["⚽", "🏏", "🏸", "🎾"].map((i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-base"
                >
                  {i}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            {["Book venues", "Join tournaments"].map((t) => (
              <span
                key={t}
                className="text-xs font-semibold text-white/70 border border-white/15 bg-white/5 px-3 py-1.5 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>

          {error ? (
            <div className="mb-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2">Full name</label>
              <input
                name="name"
                value={form.name}
                placeholder="Your name"
                onChange={handleChange}
                autoComplete="name"
                className="w-full rounded-2xl bg-white/10 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-[color:var(--ps-primary-2)] focus:ring-2 focus:ring-[color:var(--ps-primary)] focus:ring-opacity-20 transition"
              />
            </div>

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
                placeholder="Create a password"
                onChange={handleChange}
                autoComplete="new-password"
                className="w-full rounded-2xl bg-white/10 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-[color:var(--ps-primary-2)] focus:ring-2 focus:ring-[color:var(--ps-primary)] focus:ring-opacity-20 transition"
              />
            </div>

            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-2">Role</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full rounded-2xl bg-white/10 border border-white/15 px-4 py-3 text-sm text-white outline-none focus:border-[color:var(--ps-primary-2)] focus:ring-2 focus:ring-[color:var(--ps-primary)] focus:ring-opacity-20 transition"
                >
                  <option value="USER" className="text-gray-900">
                    User
                  </option>
                  <option value="ADMIN" className="text-gray-900">
                    Admin
                  </option>
                </select>
              </div> */}

              {/* <div className="sm:self-end">
                <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
                  <p className="text-xs text-white/60">Tip</p>
                  <p className="text-sm font-semibold text-white/80">Pick “Admin” only if you have the key.</p>
                </div>
              </div> */}
            {/* </div> */}

            {form.role === "ADMIN" ? (
              <div className="playswifto-fade-up">
                <label className="block text-xs font-semibold text-white/70 mb-2">Admin secret key</label>
                <input
                  name="adminKey"
                  value={form.adminKey}
                  placeholder="Enter admin key"
                  onChange={handleChange}
                  autoComplete="off"
                  className="w-full rounded-2xl bg-white/10 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-[color:var(--ps-primary-2)] focus:ring-2 focus:ring-[color:var(--ps-primary)] focus:ring-opacity-20 transition"
                />
              </div>
            ) : null}

            <button
              onClick={handleSignup}
              disabled={!canSubmit}
              className="w-full bg-[color:var(--ps-primary)] hover:bg-[color:var(--ps-primary-2)] disabled:hover:bg-[color:var(--ps-primary)] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm px-6 py-3.5 rounded-2xl transition-colors transition-transform active:scale-[0.99] shadow-sm hover:shadow-md hover:shadow-[0_20px_50px_rgba(30,136,229,0.18)]"
            >
              <span className="inline-flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                      <path
                        className="opacity-90"
                        fill="currentColor"
                        d="M12 2a10 10 0 00-9.95 9h3A7 7 0 0112 5V2z"
                      />
                    </svg>
                    Creating account...
                  </>
                ) : (
                  <>Create account</>
                )}
              </span>
            </button>

            <div className="flex items-center gap-3 py-1">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-xs text-white/40 font-semibold">OR</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <button
              onClick={handleGoogleSignup}
              disabled={loading}
              className="w-full bg-white text-gray-900 font-bold text-sm px-6 py-3.5 rounded-2xl hover:bg-gray-50 transition-colors transition-transform active:scale-[0.99] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="inline-flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                      <path
                        className="opacity-90"
                        fill="currentColor"
                        d="M12 2a10 10 0 00-9.95 9h3A7 7 0 0112 5V2z"
                      />
                    </svg>
                    Please wait...
                  </>
                ) : (
                  <>Continue with Google</>
                )}
              </span>
            </button>

            <p className="text-center text-sm text-white/50 pt-1">
              Already have an account?{" "}
              <a className="text-[color:var(--ps-accent-1)] hover:text-[color:var(--ps-accent-2)] font-semibold" href="/login">
                Log in
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

export default UserSignup;