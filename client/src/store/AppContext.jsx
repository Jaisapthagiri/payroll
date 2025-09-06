import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; 
import { toast } from "react-toastify";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [expenses, setExpenses] = useState([]);

  const [salarySlips, setSalarySlips] = useState([]);

  const [dashboard, setDashboard] = useState({});

  const registerUser = async (formData) => {
    try {
      setLoading(true);
      const res = await api.post("/api/users/register", formData, {
        withCredentials: true,
      });
      if (res.data.success) {
        setUser(res.data.user);
        toast.success("Registered successfully!");
        navigate("/dashboard");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (formData) => {
    try {
      setLoading(true);
      const res = await api.post("/api/users/login", formData, {
        withCredentials: true,
      });
      if (res.data.success) {
        setUser(res.data.user);
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      await api.post("/api/users/logout", {}, { withCredentials: true });
      setUser(null);
      toast.success("Logged out!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const getProfile = async () => {
    try {
      const res = await api.get("/api/users/profile", {
        withCredentials: true,
      });
      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch {
      setUser(null);
    }
  };

  const fetchExpenses = async () => {
    try {
      const res = await api.get("/api/expenses/my-expenses", {
        withCredentials: true,
      });
      if (res.data.success) {
        setExpenses(res.data.expenses);
      }
    } catch (error) {
      toast.error("Failed to load expenses");
    }
  };

  const addExpense = async (expenseData) => {
    try {
      const res = await api.post("/api/expenses/add", expenseData, {
        withCredentials: true,
      });
      if (res.data.success) {
        setExpenses((prev) => [...prev, res.data.expense]);
        toast.success("Expense added!");
      }
    } catch (error) {
      toast.error("Failed to add expense");
    }
  };

  const fetchSalarySlips = async () => {
    try {
      const res = await api.get("/api/salary/my-salary", {
        withCredentials: true,
      });
      if (res.data.success) {
        setSalarySlips(res.data.salarySlips);
      }
    } catch (error) {
      toast.error("Failed to load salary slips");
    }
  };

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/api/dashboard", { withCredentials: true });
      if (res.data.success) {
        setDashboard(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to load dashboard");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const value = {
    user, loading, expenses, salarySlips, dashboard, registerUser, loginUser, logoutUser,
    fetchExpenses, addExpense, fetchSalarySlips, fetchDashboard, navigate,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
