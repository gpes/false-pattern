select 
*
from indicio i 
where (select count(*) from resposta r where r.id_indicio = i.id) < 2
