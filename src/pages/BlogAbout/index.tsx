import React from 'react';
import { Card, Row, Col, Avatar, Divider, Space, Button, Tag } from 'antd';
import {
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  MailOutlined,
} from '@ant-design/icons';
import styles from './about.less';

const AboutPage: React.FC = () => {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.header}>
        <h1>About Me</h1>
        <p>Get to know me better</p>
      </div>

      <Row gutter={[32, 32]}>
        {/* Main content */}
        <Col xs={24} lg={16}>
          <Card className={styles.card}>
            <h2>Welcome!</h2>
            <p>
              I'm a passionate developer and tech enthusiast dedicated to creating innovative solutions
              and sharing knowledge with the community. With a strong background in web development, I love
              building scalable applications and writing about technology trends.
            </p>

            <Divider />

            <h3>About This Blog</h3>
            <p>
              This blog is a place where I share my thoughts, experiences, and knowledge about web
              development, programming best practices, and emerging technologies. Whether you're a
              beginner or an experienced developer, I hope you find valuable insights and practical
              tips to help you grow.
            </p>

            <h3>What You'll Find Here</h3>
            <ul>
              <li>In-depth tutorials and guides on web development</li>
              <li>Best practices for building scalable applications</li>
              <li>Reviews of tools and technologies</li>
              <li>Personal experiences and lessons learned</li>
              <li>Tips for career growth in tech</li>
            </ul>

            <h3>My Journey</h3>
            <p>
              I started my journey in web development about 5 years ago. Since then, I've worked on
              various projects, learned countless technologies, and contributed to open-source projects.
              Every project has taught me something valuable, and I'm excited to share these lessons with you.
            </p>
          </Card>
        </Col>

        {/* Sidebar */}
        <Col xs={24} lg={8}>
          {/* Profile card */}
          <Card className={styles.sidebarCard}>
            <div className={styles.profileCard}>
              <Avatar
                src="https://via.placeholder.com/120?text=Profile"
                size={120}
                className={styles.avatar}
              />
              <h3 className={styles.name}>Your Name</h3>
              <p className={styles.title}>Full-Stack Developer</p>
              <p className={styles.bio}>
                Passionate about building great products and sharing knowledge with the community.
              </p>

              <Space className={styles.socialLinks}>
                <Button
                  type="primary"
                  shape="circle"
                  icon={<GithubOutlined />}
                  href="https://github.com"
                  target="_blank"
                />
                <Button
                  type="primary"
                  shape="circle"
                  icon={<LinkedinOutlined />}
                  href="https://linkedin.com"
                  target="_blank"
                />
                <Button
                  type="primary"
                  shape="circle"
                  icon={<TwitterOutlined />}
                  href="https://twitter.com"
                  target="_blank"
                />
                <Button
                  type="primary"
                  shape="circle"
                  icon={<MailOutlined />}
                  href="mailto:your.email@example.com"
                />
              </Space>
            </div>
          </Card>

          {/* Skills card */}
          <Card className={styles.sidebarCard} title="Skills" style={{ marginTop: '20px' }}>
            <div className={styles.skillsList}>
              <div className={styles.skillCategory}>
                <p className={styles.categoryTitle}>Frontend</p>
                <Space wrap>
                  <Tag>React</Tag>
                  <Tag>TypeScript</Tag>
                  <Tag>CSS/LESS</Tag>
                  <Tag>UmiJS</Tag>
                </Space>
              </div>

              <div className={styles.skillCategory}>
                <p className={styles.categoryTitle}>Backend</p>
                <Space wrap>
                  <Tag>Node.js</Tag>
                  <Tag>Express</Tag>
                  <Tag>MongoDB</Tag>
                  <Tag>REST APIs</Tag>
                </Space>
              </div>

              <div className={styles.skillCategory}>
                <p className={styles.categoryTitle}>Tools & Others</p>
                <Space wrap>
                  <Tag>Git</Tag>
                  <Tag>Docker</Tag>
                  <Tag>CI/CD</Tag>
                  <Tag>AWS</Tag>
                </Space>
              </div>
            </div>
          </Card>

          {/* Contact card */}
          <Card className={styles.sidebarCard} title="Get In Touch" style={{ marginTop: '20px' }}>
            <p>
              I'm always interested in hearing about new projects and opportunities. Feel free to reach
              out to me via email or social media!
            </p>
            <Button
              type="primary"
              block
              size="large"
              href="mailto:your.email@example.com"
            >
              Send Me an Email
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AboutPage;
