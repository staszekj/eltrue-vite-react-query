import { useAuth } from "./context/AuthContext";
import { Counter } from "./components/Counter";

function App() {
	const { isAuthenticated, login, logout } = useAuth();

	return (
		<div>
			<h1>Counter App</h1>
			{isAuthenticated ? (
				<>
					<button type="button" onClick={() => logout()}>
						Logout
					</button>
					<Counter />
				</>
			) : (
				<button type="button" onClick={() => login()}>
					Login
				</button>
			)}
		</div>
	);
}

export default App;
