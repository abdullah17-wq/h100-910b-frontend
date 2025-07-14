export interface Message {
    id: string;
    text: string;
    type: 'user' | 'bot';
    timestamp: Date;
}

export interface GPUMachine {
    id: string;
    name: string;
    gpu: string;
    description?: string;
}

export interface LLMModel {
    id: string;
    name: string;
    provider: string;
    description?: string;
}

export interface PrecisionMode {
    id: string;
    name: string;
    description?: string;
}

export interface ChatState {
    messages: Message[];
    isLoading: boolean;
}

export interface ConfigState {
    selectedGPU: string;
    selectedModel: string;
    selectedPrecision: string;
}
