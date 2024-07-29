import { EmptyState } from "~/components/EmptyState";
import { Skeleton } from "~/components/ui/Skeleton";
import { api } from "~/utils/api";

function useVoters() {
  return api.voters.list.useQuery({});
}

export function VotersList() {
  const { data, isLoading } = useVoters();
  if (!isLoading && !data?.length)
    return (
      <EmptyState title="No hay Votantes">
        Agrega votantes para permitirles votar
      </EmptyState>
    );
  return (
    <div className="space-y-1">
      {(
        data ??
        Array(5)
          .fill(0)
          .map((_, i) => ({ recipient: i }))
      )?.map((voter) => (
        <div key={voter.recipient}>
          <Skeleton isLoading={isLoading} className="min-h-4 w-96">
            <div className="font-mono">{voter.recipient}</div>
          </Skeleton>
        </div>
      ))}
    </div>
  );
}
