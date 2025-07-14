import { GPUMachine, LLMModel, PrecisionMode, Message } from './types';

// Constants for the GPU Testing Platform
export const GPU_MACHINES: GPUMachine[] = [
    { id: 'machine-a', name: 'Nvidia', gpu: 'H-100' },
    { id: 'machine-b', name: 'Huawei', gpu: 'Ascend 910B' },
  ];
  
  export const LLM_MODELS: LLMModel[] = [
    { id: 'Yi-1.5-9B-Chat', name: 'Yi 1.5 - 9B', provider: 'Yi' },
    { id: 'baichuan2-7B-Chat', name: 'Baichuan 2 - 7B', provider: 'Baichuan' },
    { id: 'facebook--opt-1.3b', name: 'Facebook Opt 1.3B', provider: 'Meta' },
    { id: 'mistral-7B-Instruct-v0.1', name: 'Mistral 7B', provider: 'Mistral' },
    { id: 'thudm--chatglm3-6b', name: 'ChatGLM 3 - 6B', provider: 'THUDM' },
  ];
  
  export const PRECISION_MODES: PrecisionMode[] = [
    { id: 'fp16', name: 'FP16 (Fast)', description: 'Half precision for faster computation' },
    { id: 'fp32', name: 'FP32 (Balanced)', description: 'Single precision for balanced performance' },
    { id: 'int8', name: 'INT8 (Efficient)', description: 'Integer precision for maximum efficiency' },
  ];
  
  export const INITIAL_MESSAGES: Message[] = [
    {
      id: '1',
      text: "Hello! I'm your AI assistant. How can I help you today?",
      type: 'bot',
      timestamp: new Date(),
    },
    {
      id: '2',
      text: 'Hi! Can you tell me about the current GPU configuration?',
      type: 'user',
      timestamp: new Date(),
    },
    {
      id: '3',
      text: 'Currently running on GPU Machine A with the GPT-4 model. Performance metrics are looking good! What would you like to know more about?',
      type: 'bot',
      timestamp: new Date(),
    },
  ];