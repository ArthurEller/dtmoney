import React, { useState } from 'react';

import Modal from 'react-modal';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
    isOpen:  boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const { createTransaction } = useTransactions();
    
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(0);

    const [type, setType] = useState('deposit');
   
    async function handleCreateNewTransaction(event: React.FormEvent) {
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type,
        })

        setTitle('');
        setCategory('');
        setAmount(0);
        setType('deposit');


        onRequestClose();
    }

    return (
        <Modal 
        isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className='react-modal-content'
      >
          <button 
          type="button" 
          onClick={onRequestClose} 
          className="react-modal-close"
          >
              <img src={closeImg} alt="Close modal"/>
          </button>

        <Container onSubmit={handleCreateNewTransaction}>
            <h2>Register new transaction</h2>

            <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />

            <input
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))} 
                type="number"
                placeholder="Value"
            />

            <TransactionTypeContainer>
                <RadioBox
                type="button"
                onClick={() => {setType('deposit')}}
                isActive={type === 'deposit'}
                activeColor="green"
                >
                    <img src={incomeImg} alt="Income"/>
                    <span>Incomes</span>
                </RadioBox>

                <RadioBox
                type="button"
                onClick={() => {setType('withdraw')}}
                isActive={type === 'withdraw'}
                activeColor="red"

                >
                    <img src={outcomeImg} alt="Outcome"/>
                    <span>Outcomes</span>
                </RadioBox>
            </TransactionTypeContainer>

            <input 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
            />

            <button type="submit">Submit</button>
        </Container>
      </Modal>
    )
}