// router.tsx (frontend)
export async function run_process() {
    try {
      const response = await fetch('http://localhost:3001/start-tunnel');
      const { pid } = await response.json();
      console.log(`Tunnel started with PID: ${pid}`);
    } catch (error) {
      console.error('Failed to start tunnel:', error);
    }
  }