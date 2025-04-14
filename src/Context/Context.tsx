import { createContext, useContext, useState, ReactNode,FC, Dispatch, SetStateAction } from 'react';

interface DropdownContextProps {
    isOpen: boolean;
    side: string | null;
    setSide: Dispatch<SetStateAction<string | null>>;
    toggleDropdown: () => void;
    closeDropdown: () => void;
}

const DropdownContext = createContext<DropdownContextProps | null>(null);

interface DropdownProviderProps {
    children: ReactNode;
}

export const DropdownProvider: FC<DropdownProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [side, setSide] = useState<string | null>(null);
    const toggleDropdown = () => setIsOpen((prev) => !prev);
    const closeDropdown = () => setIsOpen(false);

    return (
        <DropdownContext.Provider value={{ isOpen, toggleDropdown, closeDropdown,side,setSide }}>
            {children}
        </DropdownContext.Provider>
    );
};

export const useDropdownContext = (): DropdownContextProps => {
    const context = useContext(DropdownContext);
    if (!context) {
        throw new Error('useDropdownContext must be used within a DropdownProvider');
    }
    return context;
};