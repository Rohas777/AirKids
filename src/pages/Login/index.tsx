import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { fetchAuth } from "../../redux/auth/asyncActions";
import { Auth } from "../../redux/auth/types";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/auth/selectors";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const { user, status } = useSelector(selectAuth);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            username: "admin",
            password: "admin",
        },
        mode: "onChange",
    });

    const onSubmit = (values: Auth) => {
        dispatch(fetchAuth(values));
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    return (
        <div className={styles.Login}>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <h1>Вход в аккаунт</h1>
                    <form onSubmit={handleSubmit(onSubmit)} method="post">
                        Login:
                        <br />
                        <input
                            type="text"
                            placeholder="username"
                            {...register("username", {
                                required: "Укажите логин",
                            })}
                        />
                        Password
                        <br />
                        <input
                            type="password"
                            placeholder="12345"
                            {...register("password", {
                                required: "Укажите пароль",
                            })}
                        />
                        <input
                            type="submit"
                            value="Войти"
                            className={styles.button}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
