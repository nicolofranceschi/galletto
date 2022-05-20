import Input from "../components/Input";
import Wrapper from "../components/Wrapper";
import Date from "../components/Date";
import Number from "../components/Number";
import Section from "../components/Section";

export default function DatiAnagrafici() {

  return (
    <div className="flex flex-col gap-4">
      <Section title="IL/LA SOTTOSCRITTO/A" family="DA_">
        <Wrapper title="Dati dei tutore">
          <Input name="Nome" />
          <Input name="Cognome" />
        </Wrapper>
        <div className="flex flex-col sm:flex-row gap-6">
          <Wrapper half={true} title="Nato a">
            <Input name="Città" />
            <Input name="Provincia" />
          </Wrapper>
          <Wrapper half={true} title="Nato il">
            <Date name={"datadinascitadeltutore"} />
          </Wrapper>
        </div>
        <Wrapper title="Codice Fiscale">
          <Input name="Codice fiscale" />
        </Wrapper>
        <Wrapper title="Residente in">
          <Input name="Via" />
          <Input name="Numero Civico" />
        </Wrapper>
        <Wrapper>
          <Input name="Città" />
          <Input name="CAP" />
        </Wrapper>
        <Input name="Provincia" />
        <Wrapper title="Cellulare">
          <Number name="Cellulare" />
        </Wrapper>
        <Wrapper title="E-mail">
          <Input
            name="E-mail"
            placeholder="example:email@gmail.com"
            type="email"
          />
        </Wrapper>
      </Section>
      <Section title="IN QUALITA' DI ESERCENTE LA RESPONSABILITA' GENITORIALE CHIEDE CHE IL SEGUENTE MINORE" family="DA_">
        <Wrapper title="Dati del minore">
          <Input minore={true} name="Nome" />
          <Input minore={true} name="Cognome" />
        </Wrapper>
        <div className="flex flex-col sm:flex-row gap-6">
          <Wrapper half={true} title="Nato a">
            <Input minore={true} name="Città" />
            <Input minore={true} name="Provincia" />
          </Wrapper>
          <Wrapper half={true} title="Nato il">
            <Date name={"datadinascitadelminore"} />
          </Wrapper>
        </div>
        <Wrapper title="Codice Fiscale">
          <Input minore={true} name="Codice fiscale" />
        </Wrapper>
        <Wrapper title="Residente in">
          <Input minore={true} name="Via" />
          <Input minore={true} name="Numero Civico" />
        </Wrapper>
        <Wrapper>
          <Input minore={true} name="Città" />
          <Input minore={true} name="CAP" />
        </Wrapper>
        <Input minore={true} name="Provincia" />
      </Section>
    </div>
  );
}
