import { useDisclosure } from '@chakra-ui/react';
import React from 'react';
const ComponentContext = React.createContext({});

export const ComponentProvider = ({ children }) => {
  const [pages, setPages] = React.useState('Feeds');
  const [showEmoji, setShowEmoji] = React.useState(false);
  const [modal, setModal] = React.useState('post');
  const [selectedData, setSelectedData] = React.useState({});
  const [selectedId, setSelectedId] = React.useState('');
  const [state, setState] = React.useState('');
  const [mode, setMode] = React.useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = (name) => {
    setPages(name);
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
        showEmoji,
        setShowEmoji,
        handleModalClick,
        modal,
        selectedData,
        selectedId,
        state,
        mode,
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
