import { useDisclosure } from '@chakra-ui/react';
import React, { createContext } from 'react';
const ComponentContext = React.createContext({});

export const userContext= createContext(null)
const getSteps = () => {
  return ['Package', 'Registration Details', 'Category', 'Payment'];
};

export const ComponentProvider = ({ children }) => {
  const steps = getSteps();
  const [pages, setPages] = React.useState('Feeds');
  const [showEmoji, setShowEmoji] = React.useState(false);
  const [modal, setModal] = React.useState('post');
  const [selectedData, setSelectedData] = React.useState({});
  const [selectedId, setSelectedId] = React.useState('');
  const [state, setState] = React.useState('');
  const [mode, setMode] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [data,setData] = React.useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [open, setOpen] = React.useState(false);
  const close = () => setOpen(false);

  const handleClick = (name) => {
    setPages(name);
  };

  const handleStepClick = (direction) => {
    setCurrentIndex((prevState) => {
      return (steps.length + prevState + direction) % steps.length;
    });
  };

  const toggleDialog = () => {
    setOpen(true);
  };

  const handleModalClick = (name, value, id, pId, mode) => {
    setModal(name);
    setSelectedData(value);
    setSelectedId(id);
    setState(pId);
    setMode(mode);
    onOpen();
  };



  return (
    <ComponentContext.Provider
      value={{
        pages,
        handleClick,
        isOpen,
        onOpen,
        onClose,
        selectedData,
        selectedId,
        state,
        mode,
        currentIndex,
        handleStepClick,
        toggleDialog,
        open,
        close,
        data
        
      }}
    >
      {children}
    </ComponentContext.Provider>
  );
};

export default function useComponent() {
  const context = React.useContext(ComponentContext);
  return context;
}
