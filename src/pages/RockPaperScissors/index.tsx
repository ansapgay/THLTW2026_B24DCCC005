import React, { useState } from 'react';
import { Card, Button, Space, Table, Statistic, Row, Col, Result, Modal } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import './index.less';

interface GameResult {
  id: string;
  round: number;
  playerChoice: string;
  computerChoice: string;
  result: 'win' | 'lose' | 'draw';
  timestamp: string;
}

const choices = [
  { value: 'rock', label: '✊ Búa', emoji: '👊' },
  { value: 'paper', label: '✋ Bao', emoji: '✋' },
  { value: 'scissors', label: '✌️ Kéo', emoji: '✌️' },
];

const RockPaperScissorsGame: React.FC = () => {
  const [gameHistory, setGameHistory] = useState<GameResult[]>([]);
  const [currentResult, setCurrentResult] = useState<GameResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const getRandomChoice = () => {
    return choices[Math.floor(Math.random() * choices.length)].value;
  };

  const determineWinner = (player: string, computer: string): 'win' | 'lose' | 'draw' => {
    if (player === computer) return 'draw';
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'win';
    }
    return 'lose';
  };

  const handlePlay = (playerChoice: string) => {
    const computerChoice = getRandomChoice();
    const result = determineWinner(playerChoice, computerChoice);
    const newGame: GameResult = {
      id: Date.now().toString(),
      round: gameHistory.length + 1,
      playerChoice,
      computerChoice,
      result,
      timestamp: new Date().toLocaleString('vi-VN'),
    };

    setCurrentResult(newGame);
    setShowResult(true);
    setGameHistory([newGame, ...gameHistory]);
  };

  const handleResetGame = () => {
    setGameHistory([]);
    setCurrentResult(null);
    setShowResult(false);
  };

  const getResultMessage = () => {
    if (!currentResult) return '';
    const playerChoice = choices.find(c => c.value === currentResult.playerChoice);
    const computerChoice = choices.find(c => c.value === currentResult.computerChoice);

    if (currentResult.result === 'win') {
      return `🎉 Bạn thắng! ${playerChoice?.label} đánh bại ${computerChoice?.label}`;
    } else if (currentResult.result === 'lose') {
      return `😢 Bạn thua! ${computerChoice?.label} của máy đánh bại ${playerChoice?.label}`;
    } else {
      return `🤝 Hòa! Cả hai đều chọn ${playerChoice?.label}`;
    }
  };

  const getResultStatus = () => {
    if (!currentResult) return 'success';
    return currentResult.result === 'win' ? 'success' : currentResult.result === 'lose' ? 'error' : 'info';
  };

  const historyColumns = [
    {
      title: 'Vòng',
      dataIndex: 'round',
      key: 'round',
      width: 80,
      sorter: (a: GameResult, b: GameResult) => b.round - a.round,
    },
    {
      title: 'Bạn chọn',
      dataIndex: 'playerChoice',
      key: 'playerChoice',
      render: (choice: string) => {
        const c = choices.find(x => x.value === choice);
        return `${c?.emoji} ${c?.label}`;
      },
    },
    {
      title: 'Máy chọn',
      dataIndex: 'computerChoice',
      key: 'computerChoice',
      render: (choice: string) => {
        const c = choices.find(x => x.value === choice);
        return `${c?.emoji} ${c?.label}`;
      },
    },
    {
      title: 'Kết quả',
      dataIndex: 'result',
      key: 'result',
      render: (result: string) => {
        const resultMap: { [key: string]: { text: string; color: string } } = {
          win: { text: '✓ Thắng', color: 'green' },
          lose: { text: '✗ Thua', color: 'red' },
          draw: { text: '= Hòa', color: 'orange' },
        };
        const r = resultMap[result];
        return <span style={{ color: r.color, fontWeight: 'bold' }}>{r.text}</span>;
      },
    },
    {
      title: 'Thời gian',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
  ];

  const stats = {
    wins: gameHistory.filter(g => g.result === 'win').length,
    losses: gameHistory.filter(g => g.result === 'lose').length,
    draws: gameHistory.filter(g => g.result === 'draw').length,
  };

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <Card
        style={{ maxWidth: '900px', margin: '0 auto' }}
        title="🎮 Trò Chơi Oán Tú Tì"
      >
        {/* Thông tin trò chơi */}
        <div style={{ marginBottom: '24px', padding: '16px', background: '#fafafa', borderRadius: '8px' }}>
          <p style={{ fontSize: '14px', marginBottom: '12px' }}>
            <strong>Luật chơi:</strong> Chọn Búa (✊), Bao (✋) hoặc Kéo (✌️). Máy sẽ chọn ngẫu nhiên. Búa đánh bại Kéo, Kéo đánh bại Bao, Bao đánh bại Búa!
          </p>
        </div>

        {/* Nút chơi */}
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <Space size="large" wrap style={{ justifyContent: 'center' }}>
            {choices.map(choice => (
              <Button
                key={choice.value}
                type="primary"
                size="large"
                onClick={() => handlePlay(choice.value)}
                style={{
                  fontSize: '32px',
                  height: '80px',
                  width: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                }}
              >
                {choice.emoji}
              </Button>
            ))}
          </Space>
        </div>

        {/* Kết quả hiện tại */}
        {showResult && currentResult && (
          <Modal
            title="Kết Quả"
            visible={showResult}
            onCancel={() => setShowResult(false)}
            footer={null}
            width={500}
            centered
          >
            <Result
              status={getResultStatus()}
              title={getResultMessage()}
              subTitle={`Vòng ${currentResult.round}`}
            />
          </Modal>
        )}

        {/* Thống kê */}
        {gameHistory.length > 0 && (
          <>
            <Row gutter={16} style={{ marginBottom: '24px' }}>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Thắng"
                  value={stats.wins}
                  valueStyle={{ color: 'green' }}
                />
              </Col>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Thua"
                  value={stats.losses}
                  valueStyle={{ color: 'red' }}
                />
              </Col>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Hòa"
                  value={stats.draws}
                  valueStyle={{ color: 'orange' }}
                />
              </Col>
            </Row>

            {/* Lịch sử game */}
            <Card title="📊 Lịch sử các vòng chơi" style={{ marginBottom: '16px' }}>
              <Table
                columns={historyColumns}
                dataSource={gameHistory}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                size="small"
              />
            </Card>

            {/* Nút reset */}
            <div style={{ textAlign: 'center' }}>
              <Button
                icon={<RedoOutlined />}
                onClick={handleResetGame}
                danger
              >
                Chơi Lại
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default RockPaperScissorsGame;
