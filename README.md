# Conversão para SQL Insert de Dados de CNPJ's

Fonte: [http://idg.receita.fazenda.gov.br/orientacao/tributaria/cadastros/cadastro-nacional-de-pessoas-juridicas-cnpj/dados-abertos-do-cnpj](http://idg.receita.fazenda.gov.br/orientacao/tributaria/cadastros/cadastro-nacional-de-pessoas-juridicas-cnpj/dados-abertos-do-cnpj)

# Como funciona

O script lê todos os arquivos por estado na pasta `data`, procura por linhas que comecem com `01` (significa empresa), captura o nome da empresa e o cnpj e no final gera uma linha de SQL INSERT, como por exemplo:

```bash
INSERT INTO companies (cnpj, name, state) VALUES (14583269000152, 'ESCOLINHA DE FUTEBOL ESPORTE SAUDE E LAZER', 'AC');
```

# Como usar

1. Baixe os arquivos Socios**ESTADO**.txt
2. Coloque todos os arquivos na pasta `data` na raiz do projeto
3. Execute:
```bash
node index.js UF # Ex: PE ou SP
```
4. Este processo deve demorar bastante. Estados como SP e RJ possuem muitos dados.

**OBS**: Se quiser testar com poucos dados, utilize o estado do ACRE.

# SQL Table

Você precisa ter uma tabela chamada `companies` com a seguinte estrutura:

```sql
CREATE TABLE IF NOT EXISTS public.companies (
	cnpj bigint NOT NULL,
	"name" text,
	state character varying(2),
	PRIMARY KEY(cnpj)
);
```

# Onde importar?

Você pode usar AWS ou Google cloud. No google cloud, você pode subir os arquivos convertidos para um bucket, e via Cloud Storage (no nosso caso Postgres), o próprio painel possui uma ferramenta de importar direto do bucket.
