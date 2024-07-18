import {useState} from 'react';
import styled from 'styled-components';
import CreatedJobs from './CreatedJobs';
import AppliedJobs from './AppliedJob';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const TabContainer = styled.div`
  display: flex;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background-color: ${props => props.active ? '#a0d468' : '#dcdcdc'};
  border-radius: 30px;
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    background-color: ${props => props.active ? '#8dc153' : '#c0c0c0'};
  }
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  width: 300px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 30px;
  margin-right: 15px;
`;

const ActiveJob = () => {
  const [activeTab, setActiveTab] = useState('created'); // 'created' or 'applied'
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Container>
      <HeaderContainer>
        <TabContainer>
          <TabButton active={activeTab === 'created'} onClick={() => setActiveTab('created')}>
            Created Jobs
          </TabButton>
          <TabButton active={activeTab === 'applied'} onClick={() => setActiveTab('applied')}>
            Applied Jobs
          </TabButton>
        </TabContainer>
        <SearchInput
          type="text"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </HeaderContainer>
      {activeTab === 'created' && <CreatedJobs searchQuery={searchQuery} />}
      {activeTab === 'applied' && <AppliedJobs searchQuery={searchQuery} />}
    </Container>
  );
};
export default ActiveJob;