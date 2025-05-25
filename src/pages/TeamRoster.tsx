import { useQuiz } from "@/hooks/useQuiz";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const TeamRoster = () => {
  const { 
    nickname, 
    selectedTeam,
    gameSession,
    isSessionHost,
    sessionError
  } = useQuiz();
  
  const navigate = useNavigate();

  // Redirect if not properly set up
  useEffect(() => {
    if (!nickname || !selectedTeam) {
      navigate("/team-selection");
    }
  }, [nickname, selectedTeam, navigate]);

  if (!gameSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-quiz-red-700 to-quiz-red-900 text-white">
        <div className="text-center">
          <p className="text-xl mb-4">Loading team roster...</p>
        </div>
      </div>
    );
  }

  const teams = Object.entries(gameSession.teams).map(([teamId, team]) => {
    // Get all players in this team
    const teamPlayers = Object.entries(gameSession.players)
      .filter(([_, player]) => player.teamId === teamId)
      .map(([playerId, player]) => ({
        id: playerId,
        nickname: player.nickname,
        isHost: player.isHost
      }));

    return {
      id: teamId,
      name: team.name,
      color: team.color,
      players: teamPlayers
    };
  });

  const handleStartQuiz = () => {
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-quiz-red-700 to-quiz-red-900 text-white">
      <header className="p-4 border-b border-white/10">
        <div className="container">
          <h1 className="text-2xl font-bold">Team Roster</h1>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teams.map(team => (
            <div 
              key={team.id}
              className={`p-6 rounded-lg bg-white/10 backdrop-blur-sm`}
            >
              <h2 className="text-xl font-semibold mb-4">{team.name}</h2>
              {team.players.length > 0 ? (
                <ul className="space-y-2">
                  {team.players.map(player => (
                    <li 
                      key={player.id}
                      className="flex items-center space-x-2"
                    >
                      <span className="flex-1">{player.nickname}</span>
                      {player.isHost && (
                        <span className="px-2 py-1 text-xs bg-white/20 rounded">Host</span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white/60">No players joined yet</p>
              )}
            </div>
          ))}
        </div>

        {isSessionHost && (
          <div className="mt-8 flex justify-center">
            <Button
              onClick={handleStartQuiz}
              size="lg"
              className="bg-white text-quiz-red-900 hover:bg-white/90"
            >
              Start Quiz
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeamRoster;