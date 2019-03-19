package br.edu.ifpb.gpes.shared;


import br.edu.ifpb.gpes.shared.PatternDetection;
import br.edu.ifpb.gpes.shared.TermsCounter;
import java.util.List;


/**
 *
 * @author natan
 */
public class Benchmarking {
    private List<PatternDetection> patterns;
    private List<TermsCounter> terms;

    public Benchmarking() {
    }

    public Benchmarking(List<PatternDetection> patterns, List<TermsCounter> terms) {
        this.patterns = patterns;
        this.terms = terms;
    }
    
    public List<PatternDetection> getPatterns() {
        return patterns;
    }

    public void setPatterns(List<PatternDetection> patterns) {
        this.patterns = patterns;
    }

    public List<TermsCounter> getTerms() {
        return terms;
    }

    public void setTerms(List<TermsCounter> terms) {
        this.terms = terms;
    }

    @Override
    public String toString() {
        return "Benchmarking{" + "patterns=" + patterns + ", terms=" + terms + '}';
    }
}
