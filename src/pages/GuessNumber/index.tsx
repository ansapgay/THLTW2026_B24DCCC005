import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Space, Statistic, Alert, message } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import styles from './index.less';

const GuessNumberGame: React.FC = () => {
  const [secretNumber, setSecretNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [maxAttempts] = useState<number>(10);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [feedback, setFeedback] = useState<string>('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'warning' | 'error'>('warning');
  const [guessHistory, setGuessHistory] = useState<number[]>([]);

  // Khởi tạo game
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    setSecretNumber(randomNum);
    setGuess('');
    setAttempts(0);
    setGameStatus('playing');
    setFeedback('Bắt đầu chơi! Nhập số từ 1 đến 100');
    setFeedbackType('warning');
    setGuessHistory([]);
  };

  const handleGuess = () => {
    if (!guess.trim()) {
      message.warning('Vui lòng nhập một số!');
      return;
    }

    const guessNum = parseInt(guess);

    if (isNaN(guessNum) || guessNum < 1 || guessNum > 100) {
      message.error('Vui lòng nhập một số hợp lệ từ 1 đến 100!');
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setGuessHistory([...guessHistory, guessNum]);
    setGuess('');

    if (guessNum === secretNumber) {
      setGameStatus('won');
      setFeedback(`🎉 Chúc mừng! Bạn đã đoán đúng! Số đúng là ${secretNumber}. Bạn đã dùng ${newAttempts} lượt.`);
      setFeedbackType('success');
    } else if (guessNum < secretNumber) {
      setFeedback(`❌ Bạn đoán quá thấp! Còn ${maxAttempts - newAttempts} lượt.`);
      setFeedbackType('error');

      if (newAttempts === maxAttempts) {
        setGameStatus('lost');
        setFeedback(`😢 Bạn đã hết lượt! Số đúng là ${secretNumber}.`);
        setFeedbackType('error');
      }
    } else {
      setFeedback(`❌ Bạn đoán quá cao! Còn ${maxAttempts - newAttempts} lượt.`);
      setFeedbackType('error');

      if (newAttempts === maxAttempts) {
        setGameStatus('lost');
        setFeedback(`😢 Bạn đã hết lượt! Số đúng là ${secretNumber}.`);
        setFeedbackType('error');
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && gameStatus === 'playing') {
      handleGuess();
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.gameCard} title="🎮 Trò Chơi Đoán Số">
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          {/* Thống kê */}
          <div className={styles.statsContainer}>
            <Statistic
              title="Lượt dự đoán"
              value={attempts}
              suffix={`/ ${maxAttempts}`}
              valueStyle={{ color: attempts > 7 ? '#ff4d4f' : '#1890ff' }}
            />
          </div>

          {/* Feedback */}
          {feedback && (
            <Alert
              message={feedback}
              type={feedbackType}
              showIcon
              style={{ fontSize: '16px' }}
            />
          )}

          {/* Input game */}
          {gameStatus === 'playing' && (
            <Space.Compact style={{ width: '100%' }}>
              <Input
                type="number"
                placeholder="Nhập số từ 1 đến 100"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={gameStatus !== 'playing'}
                style={{ fontSize: '16px' }}
              />
              <Button type="primary" onClick={handleGuess} style={{ fontSize: '16px' }}>
                Dự đoán
              </Button>
            </Space.Compact>
          )}

          {/* Lịch sử dự đoán */}
          {guessHistory.length > 0 && (
            <div className={styles.historyContainer}>
              <h3>Lịch sử dự đoán:</h3>
              <div className={styles.guessHistory}>
                {guessHistory.map((num, index) => (
                  <span key={index} className={styles.guessItem}>
                    {num}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Nút chơi lại */}
          {gameStatus !== 'playing' && (
            <Button
              type="primary"
              size="large"
              icon={<ReloadOutlined />}
              onClick={startNewGame}
              block
              style={{ fontSize: '16px' }}
            >
              Chơi Lại
            </Button>
          )}
        </Space>
      </Card>
    </div>
  );
};

export default GuessNumberGame;
